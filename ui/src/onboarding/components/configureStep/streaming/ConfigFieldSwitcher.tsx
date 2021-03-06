// Libraries
import React, {PureComponent, ChangeEvent} from 'react'
import _ from 'lodash'

// Components
import {Form, Input} from 'src/clockface'
import URIFormElement from 'src/shared/components/URIFormElement'
import ArrayFormElement from 'src/onboarding/components/configureStep/streaming/ArrayFormElement'

// Types
import {ConfigFieldType, TelegrafPluginName} from 'src/types/v2/dataLoaders'

// Actions
import {setConfigArrayValue} from 'src/onboarding/actions/dataLoaders'

interface Props {
  fieldName: string
  fieldType: ConfigFieldType
  index: number
  onChange: (e: ChangeEvent<HTMLElement>) => void
  addTagValue: (item: string, fieldName: string) => void
  removeTagValue: (item: string, fieldName: string) => void
  value: string | string[]
  isRequired: boolean
  onSetConfigArrayValue: typeof setConfigArrayValue
  telegrafPluginName: TelegrafPluginName
}

class ConfigFieldSwitcher extends PureComponent<Props> {
  public render() {
    const {
      fieldType,
      fieldName,
      onChange,
      value,
      onSetConfigArrayValue,
      telegrafPluginName,
    } = this.props

    switch (fieldType) {
      case ConfigFieldType.Uri:
        return (
          <URIFormElement
            name={fieldName}
            key={name}
            autoFocus={this.autoFocus}
            onChange={onChange}
            value={value as string}
            helpText={this.optionalText}
          />
        )
      case ConfigFieldType.UriArray:
      case ConfigFieldType.StringArray:
        return (
          <ArrayFormElement
            fieldName={fieldName}
            addTagValue={this.props.addTagValue}
            removeTagValue={this.props.removeTagValue}
            autoFocus={this.autoFocus}
            value={value as string[]}
            helpText={this.optionalText}
            onSetConfigArrayValue={onSetConfigArrayValue}
            telegrafPluginName={telegrafPluginName}
          />
        )
      case ConfigFieldType.String:
        return (
          <Form.Element
            label={fieldName}
            key={fieldName}
            helpText={this.optionalText}
          >
            <Input
              name={fieldName}
              autoFocus={this.autoFocus}
              onChange={onChange}
              value={value as string}
            />
          </Form.Element>
        )
      default:
        return <div />
    }
  }

  private get optionalText(): string {
    if (!this.props.isRequired) {
      return 'optional'
    }

    return ''
  }

  private get autoFocus(): boolean {
    const {index} = this.props
    return index === 0
  }
}

export default ConfigFieldSwitcher
