import FieldComponent from '@/components/Field'
import { Field } from '@/Entities/Field'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import { NumberField } from '@/Entities/NumberField'

describe('Field', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let wrapper
  afterAll(() => {
    wrapper.destroy()
  })

  it('renders as hidden', () => {
    const store = new Vuex.Store({
      state: {
        gameState: {
          lossInitiatorCoordinates: {}
        }
      },
      getters: {
        field: () => () => new Field({ x: 0, y: 0 }),
        matrixDimensions: () => ({})
      }
    })
    wrapper = mount(FieldComponent, {
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
      state: {
        gameState: {
          lossInitiatorCoordinates: {}
        }
      },
      getters: {
        field: () => () => {
          const numberField = new NumberField({ x: 0, y: 0 })
          numberField.show()
          return numberField
        },
        matrixDimensions: () => ({})
      }
    })
    wrapper = mount(FieldComponent, {
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
      state: {
        gameState: {
          lossInitiatorCoordinates: {}
        }
      },
      getters: {
        field: () => () => new Field({ x: 1, y: 1 }),
        matrixDimensions: () => ({})
      }
    })
    wrapper = mount(FieldComponent, {
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
    expect(mutations.showField).toHaveBeenCalledWith(/* not mocked store */store, expect.objectContaining({ x: 1, y: 1 }))
  })

  it('does not trigger "showField" mutation on click when not hidden', async () => {
    const mutations = {
      showField: jest.fn()
    }
    const store = new Vuex.Store({
      mutations,
      state: {
        gameState: {
          lossInitiatorCoordinates: {}
        }
      },
      getters: {
        field: () => () => {
          const field = new Field({ x: 1, y: 1 })
          field.show()
          return field
        },
        matrixDimensions: () => ({})
      }
    })
    wrapper = mount(FieldComponent, {
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

  it('does not trigger "showField" mutation on click when has flag', async () => {
    const mutations = {
      showField: jest.fn()
    }
    const store = new Vuex.Store({
      mutations,
      state: {
        gameState: {
          lossInitiatorCoordinates: {}
        }
      },
      getters: {
        field: () => () => {
          const field = new Field({ x: 1, y: 1 })
          field.flagged = true
          return field
        },
        matrixDimensions: () => ({})
      }
    })
    wrapper = mount(FieldComponent, {
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

  it('has class loss-initiator when set in vuex', () => {
    const store = new Vuex.Store({
      state: {
        gameState: {
          lossInitiatorCoordinates: {
            x: 1,
            y: 1
          }
        }
      },
      getters: {
        field: () => () => new Field({ x: 1, y: 1 }),
        matrixDimensions: () => ({})
      }
    })
    wrapper = mount(FieldComponent, {
      localVue,
      store,
      propsData: {
        x: 1,
        y: 1
      }
    })

    expect(wrapper.classes()).toContain('loss-initiator')
  })
})
