import React from 'react';

interface MobileMenuProps {
  visible?: boolean;
}

const menuItems = [
  "Home",
  "Series",
  "Films",
  "New & Popular",
  "My List",
  "Browse by Languages",
];

const MobileMenu: React.FC<MobileMenuProps> = ({ visible = false }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 rounded-md flex transition-opacity duration-1000 ease-in-out" role="menu">
      <div className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <div key={index} className="px-3 text-center text-white hover:underline" role="menuitem">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
