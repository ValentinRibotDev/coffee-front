export function Footer() {
  return (
    <div className="grid grid-cols-3 items-center h-14 bg-black text-white px-4">
      
      {/* Colonne gauche */}
      <div className="hidden md:block text-left">
        @All right reserved
      </div>
      
      {/* Colonne centrale (logo centré en permanence) */}
      <div className="flex justify-center col-span-3 md:col-span-1">
        <img
          src="CoffeeTimeLogo.png"
          className="max-h-8 object-contain filter invert brightness-0"
          alt="Coffee Time Logo"
        />
      </div>
      
      {/* Colonne droite */}
      <div className="hidden lg:block text-right">
        Valentin Ribot / Romain Richardon
      </div>
    </div>
  );
}
