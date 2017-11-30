import { create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import ThemeStore from './ThemeStore';
import GalleryStore from './GalleryStore';

const themeStore = new ThemeStore();
const galleryStore = new GalleryStore();

const hydrate = create({ storage: AsyncStorage });
hydrate('theme', themeStore);

export default {
    themeStore,
    galleryStore,
};
