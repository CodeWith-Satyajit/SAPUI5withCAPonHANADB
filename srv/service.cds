using cap_fullstack02 from '../db/schema';

service Main {
    entity Materials as projection on cap_fullstack02.Materials;
}
