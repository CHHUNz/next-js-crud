"use client"


function UserForm() {
    return (
        <div className="">
            <div className=" w-50 form-group row g-3 col-form-label-lg">
                <div className="col-xs-3">
                    <label htmlFor="ex2">col-xs-3</label>
                    <input className="form-control" id="ex2" type="text"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Username</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="username"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress2" className="form-label">Role</label>
                    <input type="text" className="form-control" id="inputAddress2"
                           placeholder="role"/>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </div>
        </div>
    );
}

export default UserForm;