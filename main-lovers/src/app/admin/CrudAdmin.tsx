const CrudAdmin = () => {


    return (
      <>
        <div className="flex justify-center items-center text-blue-lover text-4xl font-bold m-5 text-center bg-black-lover rounded-3xl h-12">USERS</div>
        <div className="mx-20 mt-10">
            <div className="overflow-x-auto">
                <table className="table table-compact w-full bg-black-lover rounded-2xl">
                    <thead>
                        <tr className="text-pink-lover">
                            <th>ID</th> 
                            <th>Username</th> 
                            <th>FirstName</th> 
                            <th>LastName</th> 
                            <th>Age</th> 
                            <th>email</th> 
                            <th>Password</th>
                            <th>City</th>
                            <th>Premium</th>
                            <th>Languages</th>
                        </tr>
                    </thead> 



                    <tbody className="bg-black-lover">

                        <tr className="text-blue-lover">
                            <td>ID</td> 
                            <td>Username</td> 
                            <td>FirstName</td> 
                            <td>LastName</td> 
                            <td>Age</td> 
                            <td>email</td> 
                            <td>Password</td>
                            <td>City</td>
                            <td>Premium</td>
                            <td>Languages</td>
                            <td>
                                <button className="btn btn-active btn-xs">Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-error">Delete</button>
                            </td>
                        </tr>
                        <tr className="text-blue-lover">
                            <td>ID</td> 
                            <td>Username</td> 
                            <td>FirstName</td> 
                            <td>LastName</td> 
                            <td>Age</td> 
                            <td>email</td> 
                            <td>Password</td>
                            <td>City</td>
                            <td>Premium</td>
                            <td>Languages</td>
                            <td>
                                <button className="btn btn-active btn-xs">Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-error">Delete</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
      </>
    );
  };
  
export default CrudAdmin;