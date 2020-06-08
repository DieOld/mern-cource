import React from 'react';
import { Link } from 'react-router-dom';

export const LinksList = ({links}) => {
    if (links.length === 0) return <p className='center'> There is no links yet</p>
    return (
        <table>
        <thead>
          <tr>
              <th>#</th>
              <th>From</th>
              <th>To</th>
              <th>Date created</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
            { links.map( (link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index+1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            {new Date(link.date).toLocaleDateString()}
                        </td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>
                    </tr>
                )
            }) }
        </tbody>
      </table>
    )
}
