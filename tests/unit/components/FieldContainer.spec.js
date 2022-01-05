import FieldContainer from '@/components/FieldContainer'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

describe('FieldContainer', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let wrapper
  beforeEach(() => {
    const store = new Vuex.Store({
      state: {
        matrix: {
          rows: 10,
          columns: 15
        }
      }
    })
    wrapper = shallowMount(FieldContainer, {
      localVue, store
    })
  })

  it('renders', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders correct field structure', () => {
    // total amount
    const totalFields = wrapper.findAllComponents({ name: 'Field' })
    expect(totalFields.length).toBe(10 * 15)

    // test rows
    const rowElements = wrapper.findAll('.field-row')
    expect(rowElements.length).toBe(10)

    // test columns of each row
    for (let i = 0; i < rowElements.length; i++) {
      const childFields = rowElements.wrappers[i].findAllComponents({ name: 'Field' })

      expect(childFields.length).toBe(15)
    }
  })

  it('passes correct pros to Fields', () => {
    for (let i = 0; i < 10; i++) {
      const rowWrapper = wrapper.find(`.field-row:nth-of-type(${i + 1})`)
      for (let j = 0; j < 15; j++) {
        const field = rowWrapper.findAllComponents({ name: 'Field' }).wrappers[j]

        expect(field.props('x')).toBe(i)
        expect(field.props('y')).toBe(j)
      }
    }
  })
})
