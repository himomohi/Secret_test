const CHARACTERS = [
    {
        id: 'warrior',
        name: '전사',
        description: '강력한 근접 전투의 달인',
        baseHealth: 150,
        baseDamage: 15,
        baseSpeed: 100,
        baseArmor: 5,
        startingSkill: 'sword_slash',
        color: '#ff4444',
        bonuses: {
            damage: 1.2,
            armor: 1.3
        }
    },
    {
        id: 'mage',
        name: '마법사',
        description: '강력한 마법 공격',
        baseHealth: 80,
        baseDamage: 25,
        baseSpeed: 90,
        baseArmor: 0,
        startingSkill: 'fireball',
        color: '#4444ff',
        bonuses: {
            damage: 1.5,
            projectileSpeed: 1.2
        }
    },
    {
        id: 'archer',
        name: '궁수',
        description: '빠른 원거리 공격',
        baseHealth: 100,
        baseDamage: 12,
        baseSpeed: 110,
        baseArmor: 2,
        startingSkill: 'arrow_shot',
        color: '#44ff44',
        bonuses: {
            attackSpeed: 1.3,
            projectileSpeed: 1.4
        }
    },
    {
        id: 'assassin',
        name: '암살자',
        description: '빠르고 치명적인 공격',
        baseHealth: 90,
        baseDamage: 18,
        baseSpeed: 130,
        baseArmor: 1,
        startingSkill: 'dagger_throw',
        color: '#9944ff',
        bonuses: {
            critChance: 1.5,
            speed: 1.2
        }
    },
    {
        id: 'paladin',
        name: '성기사',
        description: '방어와 치유 능력',
        baseHealth: 140,
        baseDamage: 13,
        baseSpeed: 95,
        baseArmor: 8,
        startingSkill: 'holy_strike',
        color: '#ffff44',
        bonuses: {
            armor: 1.5,
            healthRegen: 1.5
        }
    },
    {
        id: 'necromancer',
        name: '네크로맨서',
        description: '언데드를 소환하는 마법사',
        baseHealth: 85,
        baseDamage: 10,
        baseSpeed: 85,
        baseArmor: 1,
        startingSkill: 'summon_skeleton',
        color: '#44ffff',
        bonuses: {
            summonCount: 1.5,
            summonDamage: 1.3
        }
    },
    {
        id: 'berserker',
        name: '광전사',
        description: '체력이 낮을수록 강해짐',
        baseHealth: 120,
        baseDamage: 20,
        baseSpeed: 105,
        baseArmor: 3,
        startingSkill: 'rage_strike',
        color: '#ff8844',
        bonuses: {
            damage: 1.3,
            lifesteal: 1.2
        }
    },
    {
        id: 'druid',
        name: '드루이드',
        description: '자연의 힘을 다루는 자',
        baseHealth: 110,
        baseDamage: 14,
        baseSpeed: 100,
        baseArmor: 4,
        startingSkill: 'nature_bolt',
        color: '#88ff44',
        bonuses: {
            areaSize: 1.2,
            healthRegen: 1.3
        }
    },
    {
        id: 'monk',
        name: '수도승',
        description: '빠른 연속 공격',
        baseHealth: 95,
        baseDamage: 11,
        baseSpeed: 120,
        baseArmor: 2,
        startingSkill: 'chi_strike',
        color: '#ff44ff',
        bonuses: {
            attackSpeed: 1.4,
            speed: 1.3
        }
    },
    {
        id: 'elementalist',
        name: '원소술사',
        description: '모든 원소를 다루는 마법사',
        baseHealth: 75,
        baseDamage: 22,
        baseSpeed: 88,
        baseArmor: 0,
        startingSkill: 'elemental_blast',
        color: '#ff88ff',
        bonuses: {
            damage: 1.4,
            areaSize: 1.3
        }
    },
    {
        id: 'summoner',
        name: '소환사',
        description: '다양한 생명체를 소환',
        baseHealth: 80,
        baseDamage: 8,
        baseSpeed: 90,
        baseArmor: 1,
        startingSkill: 'summon_wolf',
        color: '#8844ff',
        bonuses: {
            summonCount: 2.0,
            summonHealth: 1.5
        }
    },
    {
        id: 'engineer',
        name: '엔지니어',
        description: '기계 장치를 설치하는 전문가',
        baseHealth: 100,
        baseDamage: 12,
        baseSpeed: 95,
        baseArmor: 3,
        startingSkill: 'deploy_turret',
        color: '#ffaa44',
        bonuses: {
            turreDamage: 1.5,
            turretCount: 1.3
        }
    }
];
