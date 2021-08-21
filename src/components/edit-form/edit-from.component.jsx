import React from 'react';

const EditForm = ({userNames,userId,title,body,changes,submition}) => {
return(
    <form onSubmit={submition}>
          <label> UserName : </label>
          <select>
            {userNames.map((detail,idx) => {
              return <option key={idx}>{detail.name}</option>;
            })}
          </select>
          <label> UserID : </label>
          <input
            type="number"
            name="userId"
            value={userId}
            onChange={changes}
          />
          <label> Title : </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={changes}
          />
          <label> Body : </label>
          <input
            type="text"
            name="body"
            value={body}
            onChange={changes}
          />
          <input type="Submit" />
        </form>
)
}

export default EditForm;