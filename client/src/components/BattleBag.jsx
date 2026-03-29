const BattleBag = ({
  playerTeam,
  activeIndex,
  potionsUsed,
  onSwitch,
  onPotion,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#1e1e2d] rounded-t-3xl border-t border-[#474754]/30 p-6 space-y-6 animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-headline font-bold text-white uppercase tracking-tight text-xl">
            Bag
          </h3>
          <button
            onClick={onClose}
            className="text-[#aba9b9] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Pokemon Section */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-label font-bold uppercase tracking-widest text-[#aba9b9]">
            Your Team
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {playerTeam.map((p, i) => {
              const isActive = i === activeIndex;
              const isFainted = p.current_hp <= 0;
              const hpPct = (p.current_hp / p.max_hp) * 100;
              const hpColor =
                hpPct > 50
                  ? "bg-green-500"
                  : hpPct > 25
                    ? "bg-yellow-400"
                    : "bg-red-500";

              return (
                <div
                  key={i}
                  onClick={() => !isActive && !isFainted && onSwitch(i)}
                  className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                    isActive
                      ? "border-red-500/50 bg-red-500/10 cursor-default"
                      : isFainted
                        ? "border-[#474754]/10 bg-[#12121e] opacity-40 cursor-not-allowed"
                        : "border-[#474754]/20 bg-[#12121e] cursor-pointer hover:border-red-500/30 hover:bg-[#242434]"
                  }`}
                >
                  <img
                    src={p.sprite}
                    alt={p.name}
                    className="w-12 h-12 object-contain"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-headline font-bold text-sm uppercase">
                        {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                      </span>
                      <span className="text-[#aba9b9] text-xs font-label">
                        {p.current_hp} / {p.max_hp}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#242434] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${hpColor}`}
                        style={{ width: `${hpPct}%` }}
                      />
                    </div>
                  </div>
                  {isActive && (
                    <span className="text-red-400 text-[10px] font-label font-bold uppercase tracking-wider">
                      Active
                    </span>
                  )}
                  {isFainted && (
                    <span className="text-[#474754] text-[10px] font-label font-bold uppercase tracking-wider">
                      Fainted
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Items Section */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-label font-bold uppercase tracking-widest text-[#aba9b9]">
            Items
          </h4>
          <div
            onClick={() => potionsUsed < 3 && onPotion()}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
              potionsUsed >= 3
                ? "border-[#474754]/10 bg-[#12121e] opacity-40 cursor-not-allowed"
                : "border-blue-500/20 bg-blue-500/10 cursor-pointer hover:border-blue-500/40 hover:bg-blue-500/20"
            }`}
          >
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-400 text-2xl">
                medical_services
              </span>
            </div>
            <div className="flex-1">
              <p className="text-white font-headline font-bold text-sm uppercase">
                Potion
              </p>
              <p className="text-[#aba9b9] text-xs font-body">
                Restores 50 HP to active pokemon
              </p>
            </div>
            <span className="text-blue-400 font-label font-bold text-sm">
              {3 - potionsUsed} left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleBag;
