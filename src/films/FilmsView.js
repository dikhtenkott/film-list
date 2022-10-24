function FilmsView({ data, loadPrev, loadNext }) {
  return (
    <div className="md:px-32 py-8 w-full">
        <div className="shadow overflow-hidden rounded border-b border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Director</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Release date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
            {data?.films?.map(item=> {
              return (
                <tr key={item.releaseDate}>
                  <td className="w-1/3 text-left py-3 px-4">{item.title}</td>
                  <td className="w-1/3 text-left py-3 px-4">{item.director}</td>
                  <td className="text-left py-3 px-4">{item.releaseDate}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
        <nav className="flex justify-center -space-x-px rounded-md mt-10">
          {/* hasPreviousPage in API always false for some reason... */}
          {data?.pageInfo?.hasPreviousPage && <button onClick={loadPrev} className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
            Previous
          </button>}

          {data?.pageInfo?.hasNextPage && <button onClick={loadNext} className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
            Next
          </button>}
        </nav>
      </div>
  )
}

export default FilmsView;
