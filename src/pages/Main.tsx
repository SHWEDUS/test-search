import React, { useCallback, useEffect } from 'react';

import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { selectFilter, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchFamous, selectFamousData } from '../redux/slices/famousSlice';
import { useAppDispatch } from '../redux/store';
import { FamousResponse } from '../models/FamousResponse';
import Header from '../components/Header';
import FamousBlock from '../components/FamousBlock';

function Main(): React.JSX.Element {
	const { currentPage } = useSelector(selectFilter);
	const { items, status } = useSelector(selectFamousData);
	const dispatch = useAppDispatch();

	const { searchValue } = useSelector(selectFilter);
	const famous =
		items &&
		items
			.filter((obj: FamousResponse) => {
				return obj.name.toLowerCase().includes(searchValue.toLowerCase());
			})
			.map((item: FamousResponse) => <FamousBlock key={item.id} {...item} />);

	const getFamous = async () => {
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchFamous({
				search,
				currentPage
			})
		);
	};

	const onChangePage = useCallback((number: number) => {
		dispatch(setCurrentPage(number));
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);

		getFamous();
	}, [searchValue, currentPage]);

	return (
		<>
			<Header />
			<div className='container'>
				<h2 className='content__title'>Все знаменитости</h2>
				{status === 'error' ? (
					<div className='content__error-info'>
						<h2>
							Упс... Таких знаменитостей нет... <span>😕</span>
						</h2>
					</div>
				) : (
					<div className='content__items'>
						{status === 'loading'
							? [...new Array(6)].map((_, index) => <div>Загрузка...</div>)
							: famous}
					</div>
				)}
				<Pagination currentPage={currentPage} setCurrentPage={onChangePage} />
			</div>
		</>
	);
}

export default Main;
