import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';
import { PRODUCTION_TYPES_MOCK } from '../../modules/production_types_mock';

export const fetchProductionTypes = createAsyncThunk(
  'productionTypes/fetchList',
  async (_, { getState, rejectWithValue }) => {
    const { productionTypes }: any = getState();
    try {
      const response = await api.api.productionTypesControllerGetList({
        min_rate: productionTypes.minRate,
        max_rate: productionTypes.maxRate,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const toggleLikeThunk = createAsyncThunk(
  'productionTypes/toggleLike',
  async ({ id, action }: { id: number, action: number }) => {
    await api.api.productionTypesControllerHandleLike(id, { action });
    return { id, action };
  }
);

export const deleteProductionThunk = createAsyncThunk(
  'productionTypes/delete',
  async (id: number) => {
    await api.api.productionTypesControllerDeleteService(id);
    return id;
  }
);

const productionTypesSlice = createSlice({
  name: 'productionTypes',
  initialState: {
    minRate: 0,
    maxRate: 200,
    items: [] as any[], 
    loading: false
  },
  reducers: {
    setFilters: (state, action) => {
      state.minRate = action.payload.minRate;
      state.maxRate = action.payload.maxRate;
    },
    resetFilters: (state) => {
      state.minRate = 0;
      state.maxRate = 200;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductionTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductionTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload as any[]; // Больше не нужен unknown
      })
      .addCase(fetchProductionTypes.rejected, (state) => {
        state.loading = false;
        state.items = PRODUCTION_TYPES_MOCK.filter(item => 
          item.status === 'published' && 
          (item.production_output_rate || 0) >= state.minRate && 
          (item.production_output_rate || 0) <= state.maxRate
        ) as any[];
      })
      .addCase(toggleLikeThunk.fulfilled, (state, action) => {
        const item: any = state.items.find((i: any) => i.production_id === action.payload.id);
        if (item) {
          item.is_liked = action.payload.action;
          item.likes_count += action.payload.action === 1 ? 1 : -1;
        }
      })
      .addCase(deleteProductionThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((i: any) => i.production_id !== action.payload);
      });
  }
});

export const { setFilters, resetFilters } = productionTypesSlice.actions;
export default productionTypesSlice.reducer;