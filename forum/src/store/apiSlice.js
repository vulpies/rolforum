import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.postscriptum.games/v1' }),
	tagTypes: ['EpiHeader', 'Posts'],
	endpoints: builder => ({
		getPosts: builder.query({
			query: epiId => ({
				url: `/episode-view/${epiId}`,
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')
						}`
				}
			}),
			providesTags: ['Posts'],
		}),
		createNewPost: builder.mutation({
			query: post => ({
				url: `/post-create`,
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')
						}`
				},
				body: post
			}),
			invalidatesTags: ['Posts']
		}),
		// deletePost: builder.mutation({
		// 	query: id => ({
		// 		url: `/post-delete/${id}`,
		// 		method: 'DELETE',
		// 		headers: {
		// 			'Authorization': `Bearer ${localStorage.getItem('token')
		// 				}`
		// 		}
		// 	}),
		// 	invalidatesTags: ['Posts']
		// })
	})
})

export const { useGetPostsQuery, useCreateNewPostMutation } = apiSlice