import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, isMockMode } from '../../api';
import { PRODUCTION_TYPES_MOCK, type IProductionType } from '../../modules/production_types_mock';

const calcRateBounds = (list: IProductionType[]) => {
  const rates = list
    .map((item) => item.production_output_rate)
    .filter((rate): rate is number => typeof rate === 'number' && !Number.isNaN(rate));

  if (rates.length === 0) {
    return { minBound: 0, maxBound: 0 };
  }

  return {
    minBound: Math.min(...rates),
    maxBound: Math.max(...rates),
  };
};

interface IFilterParams {
  min_rate?: number;
  max_rate?: number;
}

const getFilteredMockList = (minRate: number, maxRate: number, useFilter: boolean) => {
  const publishedMock = PRODUCTION_TYPES_MOCK.filter((item) => item.status === 'published').map(
    (item) => ({ ...item })
  );
  if (!useFilter) return publishedMock;

  return publishedMock.filter((item) => {
    const rate = item.production_output_rate ?? 0;
    return rate >= minRate && rate <= maxRate;
  });
};

export const fetchProductionTypes = createAsyncThunk(
  'productionTypes/fetchList',
  async (params: IFilterParams | undefined, { getState, rejectWithValue }) => {
    const { productionTypes }: any = getState();
    const hasExplicitParams = params?.min_rate !== undefined || params?.max_rate !== undefined;
    const useFilter = hasExplicitParams || productionTypes.hasAppliedFilter;

    const query: IFilterParams = {};
    if (useFilter) {
      query.min_rate = params?.min_rate ?? productionTypes.minRate;
      query.max_rate = params?.max_rate ?? productionTypes.maxRate;
    }

    if (isMockMode) {
      const publishedMock = PRODUCTION_TYPES_MOCK.filter((item) => item.status === 'published');
      const bounds = calcRateBounds(publishedMock);
      const effectiveMin = useFilter ? (params?.min_rate ?? productionTypes.minRate) : bounds.minBound;
      const effectiveMax = useFilter ? (params?.max_rate ?? productionTypes.maxRate) : bounds.maxBound;

      return {
        data: getFilteredMockList(effectiveMin, effectiveMax, useFilter),
        isFiltered: useFilter,
        fromMock: true,
      };
    }

    try {
      const response = await api.api.productionTypesControllerGetList(query);
      return {
        data: response.data as IProductionType[],
        isFiltered: useFilter,
        fromMock: false,
      };
    } catch {
      return rejectWithValue({ isFiltered: useFilter });
    }
  }
);

export const toggleLikeThunk = createAsyncThunk(
  'productionTypes/toggleLike',
  async ({ id, action }: { id: number; action: number }) => {
    if (!isMockMode) {
      await api.api.productionTypesControllerHandleLike(id, { action });
    }
    return { id, action };
  }
);

export const deleteProductionThunk = createAsyncThunk(
  'productionTypes/delete',
  async (id: number) => {
    if (!isMockMode) {
      await api.api.productionTypesControllerDeleteService(id);
    }
    return id;
  }
);

const initialMockBounds = calcRateBounds(
  PRODUCTION_TYPES_MOCK.filter((item) => item.status === 'published')
);

const productionTypesSlice = createSlice({
  name: 'productionTypes',
  initialState: {
    minBound: initialMockBounds.minBound,
    maxBound: initialMockBounds.maxBound,
    minRate: initialMockBounds.minBound,
    maxRate: initialMockBounds.maxBound,
    hasAppliedFilter: false,
    items: [] as IProductionType[],
    loading: false,
  },
  reducers: {
    setFilters: (state, action) => {
      state.minRate = action.payload.minRate;
      state.maxRate = action.payload.maxRate;
    },
    applyFilterFlag: (state) => {
      state.hasAppliedFilter = true;
    },
    resetFilters: (state) => {
      state.hasAppliedFilter = false;
      state.minRate = state.minBound;
      state.maxRate = state.maxBound;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductionTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductionTypes.fulfilled, (state, action) => {
        state.loading = false;
        const list = action.payload.data || [];
        state.items = list;

        if (action.payload.fromMock) {
          const publishedMock = PRODUCTION_TYPES_MOCK.filter((item) => item.status === 'published');
          const { minBound, maxBound } = calcRateBounds(publishedMock);
          state.minBound = minBound;
          state.maxBound = maxBound;
          if (!action.payload.isFiltered) {
            state.minRate = minBound;
            state.maxRate = maxBound;
          }
          return;
        }

        if (!action.payload.isFiltered) {
          const { minBound, maxBound } = calcRateBounds(list);
          state.minBound = minBound;
          state.maxBound = maxBound;
          state.minRate = minBound;
          state.maxRate = maxBound;
        } else {
          const { minBound, maxBound } = calcRateBounds(list);
          if (list.length > 0) {
            state.minBound = Math.min(state.minBound, minBound);
            state.maxBound = Math.max(state.maxBound, maxBound);
          }
          state.minRate = Math.max(state.minBound, Math.min(state.minRate, state.maxBound));
          state.maxRate = Math.max(state.minBound, Math.min(state.maxRate, state.maxBound));
        }
      })
      .addCase(fetchProductionTypes.rejected, (state, action: any) => {
        state.loading = false;
        const publishedMock = PRODUCTION_TYPES_MOCK.filter((item) => item.status === 'published');
        const { minBound, maxBound } = calcRateBounds(publishedMock);
        state.minBound = minBound;
        state.maxBound = maxBound;

        if (!action.payload?.isFiltered) {
          state.minRate = minBound;
          state.maxRate = maxBound;
        }

        state.items = publishedMock.filter(
          (item) =>
            (item.production_output_rate ?? 0) >= state.minRate &&
            (item.production_output_rate ?? 0) <= state.maxRate
        );
      })
      .addCase(toggleLikeThunk.fulfilled, (state, action) => {
        const item = state.items.find((i) => i.production_id === action.payload.id);
        if (item) {
          item.is_liked = action.payload.action;
          item.likes_count += action.payload.action === 1 ? 1 : -1;
        }
      })
      .addCase(deleteProductionThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.production_id !== action.payload);
        const { minBound, maxBound } = calcRateBounds(state.items);
        state.minBound = minBound;
        state.maxBound = maxBound;
        state.minRate = Math.max(minBound, Math.min(state.minRate, maxBound));
        state.maxRate = Math.max(minBound, Math.min(state.maxRate, maxBound));
      });
  },
});

export const { setFilters, applyFilterFlag, resetFilters } = productionTypesSlice.actions;
export default productionTypesSlice.reducer;