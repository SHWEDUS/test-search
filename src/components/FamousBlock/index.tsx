import React from 'react';
import { FamousResponse } from '../../models/FamousResponse';

function FamousBlock({
	name,
	picture,
	contributions
}: FamousResponse): React.JSX.Element {
	return (
		<div className='famous-block__wrapper'>
			<div className='famous-block'>
				<img className='famous-block__image' src={picture} alt='Famous' />
				<h4 className='famous-block__title'>{name}</h4>
				<div className='famous-block__selector'>
					<ul>
						{contributions.map((contribution, id) => (
							<li key={id}>{contribution}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default FamousBlock;
