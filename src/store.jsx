import { proxy } from 'valtio'
import { useProxy } from 'valtio/utils'

const store = proxy({
    open: false,
    modelPath: "/assets/hoodie_black.glb", // Default starting model
    models: {
      hoodieBlack: "/assets/hoodie_black.glb",
      hoodieWhite: "/assets/hoodie_white.glb",
      sweaterBlack: "/assets/sweater_black.glb",
      sweaterWhite: "/assets/sweater_white.glb",
    },
  });
  
  export const useStore = () => useProxy(store);
