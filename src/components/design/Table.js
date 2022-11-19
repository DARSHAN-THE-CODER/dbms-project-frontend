import React from "react";

export default function Table(
    headers,
    data,
) {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                {
                                    headers.map((header, index) => (
                                        <tr key={index}>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                {header}
                                            </th>

                                        </tr>
                                    ))
                                }
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    data.map((row, index) => (
                                        <tr key={index}>
                                            {
                                                headers.map((header, index) => (
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                        {row.header}
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}