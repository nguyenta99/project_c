export const filters = [
  {
    label: 'Status',
    childs: [
      {
        type: 'select',
        id: 'status',
        name: 'status',
        label: 'Status',
        loadOptions: (inputValue) => {
          return new Promise(resolve => {
            resolve([
              {id: 'buyed', name: "Buyed"},
              {id: 'active', name: "Active"}
            ])
          })
        }
      }
    ]
  },
]