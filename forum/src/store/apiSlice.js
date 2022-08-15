import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.postscriptum.games/v1',
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token')
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		}
	}),
	tagTypes: ['Posts', "Episodes"],
	endpoints: builder => ({
		getPosts: builder.query({
			query: epiId => ({
				url: `/episode-view/${epiId}`,
			}),
			providesTags: ['Posts'],
		}),
		createNewPost: builder.mutation({
			query: post => ({
				url: '/post-create',
				method: 'POST',
				body: post
			}),
			invalidatesTags: ['Posts']
		}),
		deletePost: builder.mutation({
			query: id => ({
				url: `/post-delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (id) => [{ type: 'Posts', id }]
		}),
		getEpisodesList: builder.query({
			query: () => ({
				url: '/episode-list-view',
			}),
			providesTags: ['Episodes']
		}),
		createNewEpi: builder.mutation({
			query: epi => ({
				url: '/episode-create',
				method: 'POST',
				body: epi
			}),
			invalidatesTags: ['Episodes']
		}),
	})
})

export const { useGetPostsQuery, useCreateNewPostMutation, useDeletePostMutation, useGetEpisodesListQuery, useCreateNewEpiMutation } = apiSlice