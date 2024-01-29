import React from 'react';

import SearchBar from '../SearchBar';

function Logo(): React.JSX.Element {
	return (
		<>
			<div>
				<h1>Посик знаменитости</h1>
			</div>
		</>
	);
}

function Header(): React.JSX.Element {
	return (
		<div className='header'>
			<div className='container'>
				<Logo />
				<SearchBar />
			</div>
		</div>
	);
}

export default Header;
