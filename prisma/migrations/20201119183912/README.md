# Migration `20201119183912`

This migration has been generated at 11/19/2020, 7:39:12 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Commands" ALTER COLUMN "address" SET DATA TYPE TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201119182306..20201119183912
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
@@ -37,17 +37,17 @@
   products  Products[]
 }
 model Commands {
-  id         Int       @id @default(autoincrement())
-  createdAt  DateTime  @default(now())
-  updatedAt  DateTime  @updatedAt
-  name       String
-  delivered  Boolean   @default(false)
-  phone      Int
-  address    Int
-  gender     String
-  Products   String
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  name      String
+  delivered Boolean  @default(false)
+  phone     Int
+  address   String
+  gender    String
+  Products  String
 }
 model Info {
   id        Int      @id @default(autoincrement())
```


