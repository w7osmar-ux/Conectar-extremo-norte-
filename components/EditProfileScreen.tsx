
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { CIDADES_BICO } from '../constants';

interface Props {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

interface LastRemoved {
  url: string;
  index: number;
}

const EditProfileScreen: React.FC<Props> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState<User>({ ...user });
  const [error, setError] = useState<string | null>(null);
  const [lastRemoved, setLastRemoved] = useState<LastRemoved | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  const undoTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
    if (error) setError(null);
  };

  const handleSave = () => {
    if (formData.images.length < 3) {
      setError("Você precisa de pelo menos 3 fotos para salvar seu perfil.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onSave(formData);
  };

  const handleAddPhoto = () => {
    const newImage = `https://picsum.photos/seed/${Math.random()}/600/800`;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, newImage]
    }));
    if (error) setError(null);
    setShowUndo(false);
  };

  const removePhoto = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (formData.images.length <= 1) return;

    const removedUrl = formData.images[index];
    setLastRemoved({ url: removedUrl, index });
    
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));

    if (error) setError(null);

    setShowUndo(true);
    if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current);
    undoTimerRef.current = window.setTimeout(() => {
      setShowUndo(false);
      setLastRemoved(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (!lastRemoved) return;

    const newImages = [...formData.images];
    newImages.splice(lastRemoved.index, 0, lastRemoved.url);

    setFormData(prev => ({
      ...prev,
      images: newImages
    }));

    setShowUndo(false);
    setLastRemoved(null);
    if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current);
  };

  const setAsPrimary = (index: number) => {
    if (index === 0) return;
    const newImages = [...formData.images];
    const [selectedImage] = newImages.splice(index, 1);
    newImages.unshift(selectedImage);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 transition-colors relative">
      {/* Toast de Desfazer */}
      <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between transition-all duration-300 transform ${showUndo ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-rose-500 text-sm filled">delete</span>
          <span className="text-xs font-bold">Foto removida</span>
        </div>
        <button 
          onClick={handleUndo}
          className="bg-primary/20 dark:bg-primary/10 text-primary dark:text-primary px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-primary/30 transition-colors"
        >
          Desfazer
        </button>
      </div>

      <header className="bg-white dark:bg-slate-900 p-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10 flex items-center justify-between">
        <button 
          onClick={onCancel} 
          className="flex items-center gap-1 text-primary dark:text-blue-400 hover:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="text-sm font-bold">Voltar</span>
        </button>
        
        <h2 className="text-base font-black dark:text-white">Editar Perfil</h2>
        
        <button 
          onClick={handleSave} 
          className={`text-sm font-bold transition-colors ${formData.images.length < 3 ? 'text-slate-300 dark:text-slate-700' : 'text-primary dark:text-blue-400'}`}
        >
          Salvar
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {error && (
          <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 p-4 rounded-xl flex items-start gap-3 animate-pulse">
            <span className="material-symbols-outlined text-rose-500">error</span>
            <p className="text-xs font-bold text-rose-600 dark:text-rose-400">{error}</p>
          </div>
        )}

        {/* Seção de Fotos */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className={`text-[10px] font-black uppercase tracking-widest ${formData.images.length < 3 ? 'text-rose-500' : 'text-primary dark:text-blue-400'}`}>
              Minhas Fotos (Mínimo 3)
            </h3>
            <span className={`text-[10px] font-bold ${formData.images.length < 3 ? 'text-rose-500' : 'text-slate-400'}`}>
              {formData.images.length} / 3 fotos
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {formData.images.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setAsPrimary(idx)}
                className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm group cursor-pointer transition-all ${
                  idx === 0 ? 'ring-4 ring-primary ring-offset-2 dark:ring-offset-slate-900' : 'hover:scale-[1.02]'
                }`}
              >
                <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                
                <button 
                  onClick={(e) => removePhoto(idx, e)}
                  className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>

                {idx === 0 ? (
                  <div className="absolute bottom-0 left-0 right-0 bg-primary text-[8px] text-white py-1 text-center font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[10px] filled">star</span> Foto de Capa
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 p-2 rounded-full text-primary">
                      <span className="material-symbols-outlined text-sm filled">star</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {formData.images.length < 6 && (
              <button 
                onClick={handleAddPhoto}
                className={`aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors ${
                  formData.images.length < 3 
                    ? 'border-rose-300 dark:border-rose-800 text-rose-400 bg-rose-50/30' 
                    : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">add_photo_alternate</span>
                <span className="text-[8px] font-black uppercase mt-1">Adicionar</span>
              </button>
            )}
          </div>
          
          <p className="text-[10px] text-slate-400 font-medium italic">
            * Toque em uma foto para defini-la como sua <strong className="text-primary">Foto de Capa</strong> principal.
          </p>
        </div>

        {/* Informações Básicas */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-blue-400">Informações Básicas</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Nome Completo</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Idade</label>
              <input 
                type="number" 
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Cidade no Bico</label>
              <select 
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 dark:text-white appearance-none"
              >
                {CIDADES_BICO.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Igreja e Fé */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-blue-400">Vida Eclesiástica</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Minha Igreja Local</label>
            <input 
              type="text" 
              name="church"
              value={formData.church}
              onChange={handleChange}
              placeholder="Ex: IASD Central de Araguatins"
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Cargo/Função</label>
            <input 
              type="text" 
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Ex: Diretor de Jovens"
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Meu Testemunho (Breve)</label>
            <textarea 
              name="testimony"
              value={formData.testimony}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 dark:text-white resize-none"
              placeholder="Conte um pouco sobre sua caminhada com Deus..."
            />
          </div>
        </div>

        <div className="pt-4 pb-10">
          <button 
            onClick={handleSave}
            className={`w-full py-4 font-bold rounded-2xl shadow-xl transition-all active:scale-95 ${
              formData.images.length < 3 
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
              : 'bg-primary text-white shadow-primary/20 hover:scale-[1.02]'
            }`}
          >
            Confirmar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileScreen;
