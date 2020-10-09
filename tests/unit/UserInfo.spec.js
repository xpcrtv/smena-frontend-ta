import { mount, createLocalVue } from '@vue/test-utils';
import UserInfo from '@/components/UserInfo.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

describe('UserInfo.vue', () => {
  let localVue;
  let vuetify;
  let store;
  let actions;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    vuetify = new Vuetify();
    actions = {
      getUserInfo: jest.fn()
    };
    store = new Vuex.Store({
      actions
    });
  });

  const mountWithComputedProperty = (computed = {}) => {
    const component = mount(UserInfo, {
      localVue,
      vuetify,
      store,
      computed
    });
    return component;
  };

  it('visible when there is user data', () => {
    const userVaule = () => ({
      id: 123,
      username: 'test-user',
      avatar: `https://picsum.photos/id/2/200/200`,
      password: '123',
      about: 'user description'
    });
    const wrapper = mountWithComputedProperty({ user: userVaule });
    expect(wrapper.find('[data-testid="user-info-card"]').exists()).toBe(true);
  });

  it('not visible when user is null', () => {
    const userVaule = () => null;
    const wrapper = mountWithComputedProperty({ user: userVaule });
    expect(wrapper.find('[data-testid="user-info-card"]').exists()).toBe(false);
  });

  it('dispatch vuex action when created', () => {
    const wrapper = mountWithComputedProperty({
      user: () => null
    });
    wrapper.vm.getUserInfo();
    wrapper.vm.$nextTick(() => {
      expect(actions.getUserInfo).toHaveBeenCalled();
    });
  });

  it('show correct data', () => {
    const userVaule = () => ({
      id: 123,
      username: 'test-username',
      avatar: `https://picsum.photos/id/123/200/200`,
      password: 'test-pwd',
      about: 'test-about'
    });
    const wrapper = mountWithComputedProperty({ user: userVaule });
    const { username, about } = userVaule();
    expect(
      wrapper.find('[data-testid="user-info-card"] .v-card__title').text()
    ).toBe(username);
    expect(
      wrapper.find('[data-testid="user-info-card"] .v-card__text').text()
    ).toBe(about);
  });
});
