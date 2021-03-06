import * as React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import './userDetails.scss';

type UserDetailsProps = {
  user: UserDetailsViewModel,
  mentor: UserDetailsViewModel,
  lineManager: UserDetailsViewModel,
  template: TemplateViewModel,
};

const UserDetails = ({ user, mentor, template, lineManager }: UserDetailsProps) => (
  <Row>
    <Col xs={12} md={2}>
      <Image src={user.avatarUrl} className="avatar" rounded/>
    </Col>
    <Col xs={12} md={9} className="user-details__col">
      <dl>
        <dt>Name</dt>
        <dd>{user.name || 'n/a'}</dd>
        <dt>Username</dt>
        <dd>{user.username}</dd>
        <dt>Email</dt>
        <dd>{user.email || 'n/a'}</dd>
        <dt>Mentor</dt>
        <dd>{mentor ? mentor.name || mentor.username : 'No Mentor Selected'}</dd>
        <dt>LineManager</dt>
        <dd>{lineManager ? lineManager.name || lineManager.username : 'No Line Manager Selected'}</dd>
        <dt>Type</dt>
        <dd>{template ? template.name : 'No Type Selected'}</dd>
      </dl>
    </Col>
  </Row>
);

export default UserDetails;
