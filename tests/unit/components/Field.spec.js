import FieldComponent from '@/components/Field'
import { Field } from '@/Entities/Field'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import { NumberField } from '@/Entities/NumberField'

describe('Field', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  it('renders as hidden', () => {
    const store = new Vuex.Store({
      getters: {
        field: () => () => new Field()
      }
    })
    const wrapper = mount(FieldComponent, {
      localVue,
      store,
      propsData: {
        x: 0,
        y: 0
      }
    })
    // hidden fields should render with 'hidden' CSS class
    expect(wrapper.html()).toContain('hidden')
    // hidden field should be empty
    expect(wrapper.text()).toBe('')
  })

  it('renders as value 1', () => {
    const store = new Vuex.Store({
      getters: {
        field: () => () => {
          const numberField = new NumberField()
          numberField.show()
          return numberField
        }
      }
    })
    const wrapper = mount(FieldComponent, {
      localVue,
      store,
      propsData: {
        x: 0,
        y: 0
      }
    })
    // not hidden fields should not render with 'hidden' CSS class
    expect(wrapper.html()).not.toContain('hidden')
    // the text should be '1'
    expect(wrapper.text()).toBe('1')
  })

  it('triggers "showField" mutation on click when hidden', async () => {
    const mutations = {
      showField: jest.fn()
    }
    const store = new Vuex.Store({
      mutations,
      getters: {
        field: () => () => new Field()
      }
    })
    const wrapper = mount(FieldComponent, {
      localVue,
      store,
      propsData: {
        x: 1,
        y: 1
      }
    })

    const fieldContainer = wrapper.find('.field-container')
    await fieldContainer.trigger('click')
    expect(mutations.showField).toHaveBeenCalled()
    expect(mutations.showField).toHaveBeenCalledWith(/* not mocked store */{}, expect.objectContaining({ x: 1, y: 1 }))
  })

  it('does not trigger "showField" mutation on click when not hidden', async () => {
    const mutations = {
      showField: jest.fn()
    }
    const store = new Vuex.Store({
      mutations,
      getters: {
        field: () => () => {
          const field = new Field()
          field.show()
          return field
        }
      }
    })
    const wrapper = mount(FieldComponent, {
      localVue,
      store,
      propsData: {
        x: 1,
        y: 1
      }
    })

    const fieldContainer = wrapper.find('.field-container')
    await fieldContainer.trigger('click')
    expect(mutations.showField).not.toHaveBeenCalled()
  })
})
