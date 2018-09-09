export default (actions, consts) => {
  Object.keys(actions).forEach(action => {
    const { type } = actions[action]();
    it(`has a type [${type}]`, () => {
      expect(consts.indexOf(type) > -1).toEqual(true);
    });
  });
};
