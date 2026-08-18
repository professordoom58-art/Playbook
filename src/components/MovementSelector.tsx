import React, { useState } from 'react';
import { Movement } from '../types';
import { Edit2, Target, X } from 'lucide-react';

interface MovementSelectorProps {
  currentMovement: Movement;
  onSelectMovement: (movement: Movement) => void;
  customMovements: Movement[];
  onCustomMovementCreated: (movement: Movement) => void;
}

export const MovementSelector: React.FC<MovementSelectorProps> = ({
  currentMovement,
  onCustomMovementCreated
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newMovement: Movement = {
      id: `custom-${Date.now()}`,
      name: formName.trim(),
      country: 'Global',
      era: 'Current Era',
      category: 'Custom Card',
      description: 'User-customized Bingo card'
    };

    onCustomMovementCreated(newMovement);
    setFormName('');
    setShowModal(false);
  };

  return (
    <div id="movements-section" className="bg-white border-b-2 border-slate-200 py-2.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* TARGET CARD TITLE */}
        <div className="flex items-center gap-2.5">
          <Target className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            TARGET CARD:
          </span>
          <span className="font-display font-black text-base text-slate-900 truncate">
            {currentMovement.name}
          </span>
        </div>

        {/* SET CARD TITLE BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="btn-play-secondary text-xs py-1.5 px-3.5 flex-shrink-0"
        >
          <Edit2 className="w-3.5 h-3.5 text-purple-600" />
          <span>SET CARD TITLE</span>
        </button>

      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-slate-900 shadow-[0_8px_0_0_#0F172A] max-w-md w-full p-6 relative animate-in fade-in zoom-in-95">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">Set Card Title</h3>
            <p className="text-xs font-semibold text-slate-500 mb-4">
              Enter a movement or organization name for your Bingo Card.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                  Target Movement Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Environmental Action Coalition"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none font-bold text-slate-800 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-play-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-play-purple text-xs py-2 px-5"
                >
                  Save Title
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};
