const orders = [
	{
		title: 'On-going Orders',
		list: [
			{
				name: 'Item Name',
				qty: 3,
				price: 800,
				deliveryType: 'delivery',
				id: '00000',
				arrivalRange: {
					start: new Date('06/19/2021 2:30 AM'),
					end: new Date('06/19/2021 3:30 PM')
				},
			},
			{
				name: 'Item Name',
				qty: 3,
				price: 800,
				deliveryType: 'pickup',
				id: '00001',
				readyBy: new Date('06/19/2021 3:30 PM')
			}
		]
	},
	{
		title: 'Completed Orders',
		list: [
			{
				name: 'Item Name',
				qty: 3,
				price: 800,
				deliveryType: 'delivery',
				id: '00002',
				date: new Date('06/19/2021 1:45 PM'),
				completed: true
			},
			{
				name: 'Item Name',
				qty: 3,
				price: 800,
				deliveryType: 'delivery',
				id: '00003',
				date: new Date('06/19/2021 1:45 PM'),
				completed: true
			},
		]
	},
];

export default { orders };