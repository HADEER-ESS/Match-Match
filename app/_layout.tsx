import { FontLoader } from '@/util/fontLoader';
import { Slot } from 'expo-router';

export default function Layout() {
    return <FontLoader><Slot /></FontLoader>;
}