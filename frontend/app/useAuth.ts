import { useState, useEffect } from 'react';

export function useAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await fetch('/api/user');
				if (response.ok) {
					const data = await response.json();
					setUser(data.user);
				}
			} catch (error) {
				console.error('Failed to fetch user:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchUser();
	}, []);

	return { user, loading };
}
