import React from "react";

export const InputElement = props => (
    <div className="form-group">
        <label htmlFor="exampleInputEmail1">{props.label}</label>
        <input onChange={props.onChange} type={props.type} name={props.name} className="form-control" placeholder={props.placeholder} />
    </div>
)