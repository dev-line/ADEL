# Migration `20201201183036`

This migration has been generated at 12/1/2020, 7:30:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Users" ADD COLUMN     "reset_password_token" TEXT NOT NULL DEFAULT E''
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201119183912..20201201183036
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Users {
   id        Int      @id @default(autoincrement())
@@ -14,8 +14,9 @@
   email     String   @unique
   username  String   @unique
   name      String
   password  String
+  reset_password_token  String @default("")
 }
 model Products {
   id             Int          @id @default(autoincrement())
```


