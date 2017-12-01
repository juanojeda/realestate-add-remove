import React from 'react';
import { mount } from 'enzyme';
import ConnectedProperty, { Property } from './';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

//TODO: add `raf` polyfill to remove react warnings

// chai.expect can be used for some pretty cool assertions,
// including styles and html attributes
chai.use(chaiEnzyme());

const AGENCY_COLOR = 'red';
const AGENCY_IMG = 'http://placehold.it/300x60';
const PROPERTY_IMG = 'http://placehold.it/300x300';
const PROPERTY_PRICE = '$500';

function init(isSaved = false) {
  const props = {
    actions: {
      addProperty: jest.fn(),
      removeProperty: jest.fn(),
    },
    isSaved,
    price: '$500',
    agency: {
      brandingColors: {
        primary: AGENCY_COLOR
      },
      logo: AGENCY_IMG
    },
    id: 'test',
    mainImage: PROPERTY_IMG
  };

  const enzymeWrapper = mount(<Property {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Property', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = init();

    expect(enzymeWrapper.find('.property').length).toBe(1);
  });

  it('should style the header based on the agency branding', () => {
    const { enzymeWrapper } = init();
    const $header = enzymeWrapper.find('.property__header');
    const $headerImg = $header.find('img');

    chai.expect($header).to.have.style('background', AGENCY_COLOR);
    expect($headerImg).toHaveLength(1);
    expect($headerImg.prop('src')).toBe(AGENCY_IMG);
  });

  it('should show the property details', () => {
    const { enzymeWrapper } = init();
    const $img = enzymeWrapper.find('.property__image');
    const $price = enzymeWrapper.find('.property__price');

    expect($img.prop('src')).toBe(PROPERTY_IMG);
    expect($price.text()).toBe(PROPERTY_PRICE);
  });

  it('has shows the right button on hover', () => {
    const { enzymeWrapper: unsavedProperty } = init();
    const { enzymeWrapper: savedProperty } = init(true); // sets

    const $unsavedCTA = unsavedProperty.find('.property__cta');
    const $savedCTA = savedProperty.find('.property__cta');

    expect($unsavedCTA.prop('className')).toContain('--add');
    expect($unsavedCTA.text()).toBe('Add');

    expect($savedCTA.prop('className')).toContain('--remove');
    expect($savedCTA.text()).toBe('Remove');
  });

  it('calls the appropriate add/remove action on CTA click', () => {
    const {
      enzymeWrapper: unsavedProperty,
      props: unsavedProps } = init();
    const {
      enzymeWrapper: savedProperty,
      props: savedProps
    } = init(true); // sets

    expect(unsavedProps.actions.addProperty.mock.calls.length).toBe(0);
    expect(unsavedProps.actions.removeProperty.mock.calls.length).toBe(0);

    unsavedProperty.find('.property__cta').simulate('click');
    expect(unsavedProps.actions.addProperty.mock.calls.length).toBe(1);

    expect(unsavedProps.actions.addProperty.mock.calls[0][0]).toEqual(unsavedProps);
    expect(unsavedProps.actions.removeProperty.mock.calls.length).toBe(0);

    expect(savedProps.actions.addProperty.mock.calls.length).toBe(0);
    expect(savedProps.actions.removeProperty.mock.calls.length).toBe(0);


    savedProperty.find('.property__cta').simulate('click');
    expect(savedProps.actions.addProperty.mock.calls.length).toBe(0);
    expect(savedProps.actions.removeProperty.mock.calls.length).toBe(1);
    expect(savedProps.actions.removeProperty.mock.calls[0][0]).toBe('test');
  });
});
