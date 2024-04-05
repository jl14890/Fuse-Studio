import { proxy } from 'valtio'
import { useProxy } from 'valtio/utils'

const store = proxy({
    open: false,
    modelPath: "public/assets/hoodie_black.glb", // Default starting model
    models: {
      hoodieBlack: "public/assets/hoodie_black.glb",
      hoodieWhite: "public/assets/hoodie_white.glb",
      sweaterBlack: "public/assets/sweater_black.glb",
      sweaterWhite: "public/assets/sweater_white.glb",
    },
  });
  
  export const useStore = () => useProxy(store);
