public with sharing class AccounTriggerHandler {
    
    public static Set<Id> updatedAccounts = new Set<Id>(); // Keep track of updated accounts

    public void beforeUpdateAccount(List<Account> accountUpdList) {
        /* System.debug('$$$$$$ AccounTriggerHandler.updatedAccounts: ' + AccounTriggerHandler.updatedAccounts);
        for (Account account : accountUpdList) {
            Decimal calculateAmount = 0.00;
            System.debug('$$$$$$ account.AnnualRevenue: ' + account.AnnualRevenue);
            System.debug('$$$$$$ 初始计算结果 calculateAmount: ' + calculateAmount);
            if (account.ParentId == null && !updatedAccounts.contains(account.Id)) {
                Decimal amount = account.AnnualRevenue;
                System.debug('$$$$$$ 初始计算结果 amount: ' + amount);
                calculateAmount = amount + calculateRAAmount(account.Id);
                updatedAccounts.add(account.Id); // Mark as updated
                // 更新下级客户的状态为 'A'
                account.AccountNumber = 'B级客户';
                updateChildAccountsStatus(account.Id, account.AccountNumber);
                System.debug('$$$$$$ 最终计算结果RA: ' + account.AnnualRevenue);
                System.debug('$$$$$$ 最终计算结果RA: ' + calculateAmount);
            } else if(account.ParentId != null && !updatedAccounts.contains(account.Id)) {
                // 往上层找 一直找到最顶层 然后返回最顶层的accountId
                Account topMostAccount = findTopMostParent(account.Id);
                calculateAmount = calculateRAAmount(topMostAccount.Id);
                System.debug('$$$$$$ 最终计算结果RB: ' + calculateAmount);
                updateTopMostAccount(topMostAccount.Id, topMostAccount.AnnualRevenue); // Update top-most account
                updatedAccounts.add(account.Id); // Mark as updated
            }
        } */
    }

    public static Decimal calculateRAAmount(String accountRaId) {
        Decimal totalAmount = 0.00;
        totalAmount = calculateRBAndRCRecursive(accountRaId, totalAmount);
        return totalAmount;
    }
    
    private static Decimal calculateRBAndRCRecursive(String accountId, Decimal totalAmount) {
        List<Account> childAccounts = [SELECT Id, AnnualRevenue FROM Account WHERE ParentId = :accountId];
    
        if (childAccounts.isEmpty()) {
            return 0.00; // No child accounts, return 0.00
        }
    
        for (Account childAccount : childAccounts) {
            totalAmount += childAccount.AnnualRevenue;
    
            // Recursively calculate RC amounts for child accounts
            totalAmount += calculateRBAndRCRecursive(childAccount.Id, 0.00);
        }
    
        return totalAmount;
    }

    private static Account findTopMostParent(String accountId) {
        Account currentAccount = [SELECT Id, ParentId, AnnualRevenue FROM Account WHERE Id = :accountId];
        if (currentAccount.ParentId == null) {
            return currentAccount; // Found top-most parent
        } else {
            return findTopMostParent(currentAccount.ParentId);
        }
    }

    private static void updateTopMostAccount(String accountId, Decimal annualRevenue) {
        Account topMostAccount = new Account(Id = accountId, AnnualRevenue = annualRevenue);
        update topMostAccount;
    }

    @future
    private static void updateChildAccountsStatus(String parentAccountId, String accountClassification) {
        List<Account> childAccountsToUpdate = new List<Account>();
        collectChildAccountsToUpdate(parentAccountId, childAccountsToUpdate, accountClassification);
        
        if (!childAccountsToUpdate.isEmpty()) {
            for (Account account : childAccountsToUpdate) {
                updatedAccounts.add(account.Id);
            }
            update childAccountsToUpdate;
        }
    }
    
    private static void collectChildAccountsToUpdate(String accountId, List<Account> childAccountsToUpdate, String accountClassification) {
        List<Account> childAccounts = [SELECT Id FROM Account WHERE ParentId = :accountId];
        
        if (!childAccounts.isEmpty()) {
            for (Account childAccount : childAccounts) {
                childAccount.AccountNumber = accountClassification;
                childAccountsToUpdate.add(childAccount);
                
                // 递归收集子客户
                collectChildAccountsToUpdate(childAccount.Id, childAccountsToUpdate, accountClassification);
            }
        }
    }

}