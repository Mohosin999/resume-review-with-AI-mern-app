import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  theme: 'dark';
  resolvedTheme: 'dark';
}

const applyThemeToDocument = () => {
  if (typeof window === 'undefined') return;
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add('dark');
};

const initialState: ThemeState = {
  theme: 'dark',
  resolvedTheme: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'dark'>) => {
      state.theme = action.payload;
      state.resolvedTheme = action.payload;
      localStorage.setItem('theme', action.payload);
      applyThemeToDocument();
    },
  },
});

if (typeof window !== 'undefined') {
  applyThemeToDocument();
}

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
