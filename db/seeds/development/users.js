exports.seed = (knex, Promise) => {
	// delete all existing rows
	return knex('users').del()
	.then(() => {
		// insert seeds
		return knex('users').insert([
			{
				Name: 'M Algah Fattah Illahi',
				IndonesianID: '1310030206990001',
				Birthday: '1999-02-02 00:00:00'
			},
			{
				Name: 'Muhammad Afiful Amin',
				IndonesianID: '1374012912980001',
				Birthday: '1998-12-29 00:00:00'
			},
			{
				Name: 'Fadhil Muhammad Taufik',
				IndonesianID: '1375010212990001',
				Birthday: '1999-12-02 00:00:00'
			},
			{
				Name: 'Aulia Fikri',
				IndonesianID: '1374010403990001',
				Birthday: '1999-03-04 00:00:00'
			},
			{
				Name: 'Achmad Rafki Firdaus',
				IndonesianID: '1304030303990001',
				Birthday: '1999-03-03 00:00:00'
			},
			{
				Name: 'Arival Jefry',
				IndonesianID: '1374023112980001',
				Birthday: '1998-12-31 00:00:00'
			},

			])
	})
}