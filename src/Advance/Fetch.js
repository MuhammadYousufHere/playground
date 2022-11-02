import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Fetch = () => {
	const [posts, setPosts] = useState([]);
	const [error, setErros] = useState();

	useEffect(() => {
		(async () => {
			try {
				const response = await axios(
					'https://jsonplaceholder.typicode.com/posts'
				);
				if (response.status === 200) setPosts(response.data);
				return new Error('Something went wrong!');
			} catch (error) {
				setErros(JSON.stringify(error.message));
			}
		})();
	}, []);
	return (
		<div>
			{posts?.map(({ title, id }) => (
				<p key={id}>{title}</p>
			))}
			{error && <p>{error}</p>}
		</div>
	);
};

export default Fetch;
