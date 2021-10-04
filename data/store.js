const store = {
	info: {
		name: 'Store Name', 
		rating: '4.0', 
		status: 'Open',
		delFee: 200,
		activeTimes: '8AM-6PM, Mon-Fri',
		delTime: '30-35',
		location: 'Ikeja, Lagos',
		tags: [
			{
				name: 'Tag 1'
			},
			{
				name: 'Tag 2'
			},
			{
				name: 'Tag 3'
			},
		],
	},
	foodCategories: [
		{
			name: 'Category 1',
			list: [
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 1
				},
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 2
				},
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 3
				},
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 4
				},
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 5
				},
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 6
				},
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 7
				},
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 8
				},
			]
		},
		{
			name: 'Category 2',
			list: [
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 0
				},
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 2
				},
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 3
				},
				{
					image: '',
					name: 'Item Name',
					price: 800,
					_id: 4
				},
			]
		}
	],
	location: {
		url: ''
	}
}

const recommendedFoodsList = [
	{
		image: '',
		name: 'Item Name',
		price: 800,
		_id: 0
	},
	{
		image: '',
		name: 'Item Name',
		price: 800,
		_id: 1
	},
	{
		image: '',
		name: 'Item Name',
		price: 800,
		_id: 2
	},
	{
		image: '',
		name: 'Item Name',
		price: 800,
		_id: 3
	},
	{
		image: '',
		name: 'Item Name',
		price: 800,
		_id: 4
	},
	{
		image: '',
		name: 'Item Name',
		price: 800,
		_id: 5
	},
	{
		image: '',
		name: 'Item Name',
		price: 800,
		_id: 6
	},
	{
		image: '',
		name: 'Item Name',
		price: 800,
		_id: 7
	},
]

const data = {
	store,
	recommendedFoodsList
}

export default data;