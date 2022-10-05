import { configureStore } from '@reduxjs/toolkit';

import { formSlice } from './form';

export default configureStore({
    reducer: {
        form: formSlice,
    }
});