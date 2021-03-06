// Libraries
import React, {PureComponent} from 'react'

// Components
import {IndexList} from 'src/clockface'

// Types
import {User} from 'src/api'

interface Props {
  members: User[]
  emptyState: JSX.Element
}

export default class MemberList extends PureComponent<Props> {
  public render() {
    return (
      <IndexList>
        <IndexList.Header>
          <IndexList.HeaderCell columnName="Name" width="75%" />
          <IndexList.HeaderCell width="25%" />
        </IndexList.Header>
        <IndexList.Body columnCount={2} emptyState={this.props.emptyState}>
          {this.rows}
        </IndexList.Body>
      </IndexList>
    )
  }

  private get rows(): JSX.Element[] {
    return this.props.members.map(member => (
      <IndexList.Row key={member.id}>
        <IndexList.Cell>{member.name}</IndexList.Cell>
        <IndexList.Cell revealOnHover={true}>DELETE</IndexList.Cell>
      </IndexList.Row>
    ))
  }
}
