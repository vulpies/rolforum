import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

const Pagination = (props) => {
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10

	console.log(props, 'props')
	console.log(pageCount, 'pageCount')
	console.log(currentItems, 'currentItems')

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(props.children.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(props.data.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, props.data]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % props.data.length;
		setItemOffset(newOffset);
	};

	return (
		<>
			{currentItems}

			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				marginPagesDisplayed={1}
				pageRangeDisplayed={2}
				pageCount={pageCount}
				previousLabel="< back"
				renderOnZeroPageCount={null}
				containerClassName='pagination__container'
				activeLinkClassName='pagination__active-page'
				previousLinkClassName="pagination__prev-link"
				nextLinkClassName="pagination__next-link"
				previousClassName='pagination__prev'
				nextClassName='pagination__next'
				pageClassName='pagination__page'
				disabledLinkClassName='pagination__disabled'
			/>
		</>
	);
}

export default Pagination