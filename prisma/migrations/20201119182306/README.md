# Migration `20201119182306`

This migration has been generated at 11/19/2020, 7:23:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Commands" DROP CONSTRAINT "Commands_productsId_fkey"

ALTER TABLE "Commands" DROP COLUMN "products",
DROP COLUMN "productsId",
ADD COLUMN     "Products" TEXT NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201118173952..20201119182306
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
@@ -26,9 +26,8 @@
   name           String
   price_silver   Float
   price_blacquer Float
   categories     Categories[]
-  commands       Commands[]
 }
 model Categories {
   id        Int        @id @default(autoincrement())
@@ -38,17 +37,17 @@
   products  Products[]
 }
 model Commands {
-  id        Int        @id @default(autoincrement())
-  createdAt DateTime   @default(now())
-  updatedAt DateTime   @updatedAt
-  name      String
-  delivered Boolean    @default(false)
-  phone     Int
-  address   Int
-  gender    String
-  products  String
+  id         Int       @id @default(autoincrement())
+  createdAt  DateTime  @default(now())
+  updatedAt  DateTime  @updatedAt
+  name       String
+  delivered  Boolean   @default(false)
+  phone      Int
+  address    Int
+  gender     String
+  Products   String
 }
 model Info {
   id        Int      @id @default(autoincrement())
```


