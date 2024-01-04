import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
const api = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://example.org/',
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
   keepUnusedDataFor: 30,
   tagTypes:['Pokemons']
   endpoints: build => ({         
       getPokemons: build.query({             
             query: () => (`/getpokemons`),
             transformResponse: (response) => response.data,
             providesTags: ['Pokemons'],
       }),
       createUser: build.mutation({
             query: (request) => ({
                 url: '/createpokemon',
                 method: 'POST',
                 body: request,
             }),
             invalidatesTags: ['Pokemons'],
       }),
    }), 
});
export const {useGetPokemonsQuery, useCreatePokemonMutation} = api;
export default api;
