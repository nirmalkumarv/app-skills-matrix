import * as R from 'ramda';

const hydrateSkillsWithStaticData = (skills: UnhydratedEvaluationSkill[]) =>
  ({ id: skillGroupId, level, category, skills: skillsInSkillGroup }): PaginatedEvaluationSkill[] =>
    R.map(
      (skillUid: number) => {
        const { id, name, criteria, questions, type, status } = skills[skillUid];

        return ({
          skillUid,
          id,
          name,
          criteria,
          questions,
          type,
          status,
          skillGroupId,
          level,
          category,
        });
      },
    )(skillsInSkillGroup);

const sortSkillGroupsByInverseLevel = levels =>
  (skillGroups) => {
    const indexOfLevel = (a, b) => {
      if (levels.indexOf(a.level) > levels.indexOf(b.level)) return -1;
      if (levels.indexOf(a.level) < levels.indexOf(b.level)) return 1;
      return 0;
    };

    return R.sort(indexOfLevel)(R.values(skillGroups));
  };

const orderCategories = categories =>
  obj => R.reduce((acc, curr: number) => [].concat(acc, obj[curr]), [])(categories);


const category = skillGroup => skillGroup.category;

export default (skills: UnhydratedEvaluationSkill[], skillGroups: UnhydratedSkillGroup[], levels: string[], categories: string[]): PaginatedEvaluationSkill[] =>
  R.compose(
    R.flatten,
    R.map(hydrateSkillsWithStaticData(skills)),
    orderCategories(categories),
    R.map(sortSkillGroupsByInverseLevel(levels)),
    R.groupBy(category) as any,
    R.values,
  )(skillGroups) as any;
