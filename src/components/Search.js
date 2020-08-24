import React from 'react';
import { Form, Col } from 'react-bootstrap';

function Search({params, onParamChange }) {
    return (
        <div>
            <Form className="mb-4">
                <Form.Row className="align-items-end">
                    <Form.Group as={Col}>
                        <Form.Label><h3>Description</h3></Form.Label>
                        <Form.Control onChange={onParamChange}
                            value={params.description}
                            name="description"
                            type="text"
                            placeholder="Filter by Jobs title, Company, Expertise ...."
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label><h3>Location</h3></Form.Label>
                        <Form.Control onChange={onParamChange}
                            value={params.location}
                            name="location"
                            type="text"
                            placeholder="Filter by City, State, Zip-code, Country ...."
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs="auto" className="ml-2">
                        <Form.Check 
                        onChange={onParamChange} 
                        value={params.full_time} 
                        name="full_time" 
                        id="fill-time"
                        className="mb-2"
                        label="Only Full Time Jobs ?"
                        type="checkbox" />
                    </Form.Group>
                </Form.Row>
            </Form>
        </div>
    )
}

export default Search
