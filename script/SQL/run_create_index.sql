CREATE INDEX idx_skills_skill_idx ON skills(skill_idx);
CREATE INDEX idx_skills_buff_idx ON skills_buff(skill_idx);
CREATE INDEX idx_skills_buff_status ON skills_buff(status);
CREATE INDEX idx_skills_buff_weapon ON skills_buff(weapon);
CREATE INDEX idx_skills_buff_armor ON skills_buff(armor);
CREATE INDEX idx_skill_tooltip_idx ON skill_tooltip(skill_idx);