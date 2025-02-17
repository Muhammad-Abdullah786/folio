-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '💋',
    "by" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);
